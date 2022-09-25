export default function checkResponse(res)  {
  return res.ok ? res.json() : Promise.reject(res.status);
}
