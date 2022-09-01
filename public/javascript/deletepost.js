async function deletePostHandler(event) {
  const target = event.target;
  if (target.matches(".deletePost")) {
    const response = await fetch(`/api/post/${target.dataset.id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("#posts").addEventListener("click", deletePostHandler);
