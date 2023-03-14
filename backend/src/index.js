require("dotenv").config();
const http = require("http");
const { URL } = require("url");
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: process.env.ES_URL,
});

http.createServer(handle).listen(8080);

async function handle(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const url = new URL(`http://incoming${req.url}`);
    switch (`${req.method} ${url.pathname}`) {
      case "GET /orgs":
        res.writeHead(200).end(
          JSON.stringify({
            message: "OK",
            results: await searchOrgs(url.searchParams),
          })
        );
        break;

      case "GET /fundings":
        res.writeHead(200).end(
          JSON.stringify({
            message: "OK",
            results: await searchFundings(url.searchParams),
          })
        );
        break;

      default:
        res.writeHead(404).end(
          JSON.stringify({
            message: "Not Found",
          })
        );
        break;
    }
  } catch (e) {
    console.error(e.stack);
    res.writeHead(500).end(
      JSON.stringify({
        message: "Something went wrong",
      })
    );
  }
}

function getSearchBody(queryParams) {
  if (!queryParams) {
    return {
      size: 10,
      from: 0,
    };
  }

  const limit = queryParams.get("limit");
  const offset = queryParams.get("offset");
  const body = {
    size: limit != null ? limit : 10,
    from: offset != null ? offset : 0,
  };
  for (const [key, value] of queryParams.entries()) {
    if (key === "sort") {
      const [field, direction] = value.split(":");
      body.sort = [
        {
          [field]: {
            order: direction,
          },
        },
      ];
    } else if (key.includes("exact")) {
      // Hack to get exact company. Cannot get uuid filtering to work
      const query = body.query || { match: {} };
      const _key = key.replace("_exact", "");
      query.match = {
        ...query.match,
        [_key]: { query: value, operator: "and" },
      };
      console.log("QUERY", query, "KEY", key);
      body.query = query;
    } else if (!["limit", "offset"].includes(key)) {
      const query = body.query || { match: {} };
      query.match = {
        ...query.match,
        [key]: value,
      };
      console.log("QUERY", query, "KEY", key);
      body.query = query;
    }
  }

  return body;
}

async function searchOrgs(queryParams) {
  const body = getSearchBody(queryParams);
  console.log("ORGS", body);

  const response = await client.search({
    index: "org",
    body,
  });

  return {
    hits: response.body.hits.hits.map((h) => h._source),
    total: response.body.hits.total.value,
  };
}

async function searchFundings(queryParams) {
  const body = getSearchBody(queryParams);
  console.log("FUNDINGS", body);

  const response = await client.search({
    index: "funding",
    body,
  });

  return {
    hits: response.body.hits.hits.map((h) => h._source),
    total: response.body.hits.total.value,
  };
}
