const url = "https://backend-ixlt-production.up.railway.app/store/regions";
const key = "pk_a039ffb1e9fbc224244706a34f9e9bd752a70ea775b291696c31f146179c3758";

fetch(url, {
  headers: {
    "x-publishable-api-key": key
  }
})
.then(res => {
  console.log("Status:", res.status);
  return res.json();
})
.then(data => {
  console.log("Data fetched successfully");
})
.catch(err => {
  console.error("Fetch failed:", err.message);
});
