//localhost:5001/list/?category=국내&page=1

//Output
//{category : "국내", page : 1}

export default function getParams() {
  const searchParams = new URLSearchParams(location.search);
  let params = {};

  for (const param of searchParams) {
    params[param[0]] = param[1];
  }

  return params;
}
