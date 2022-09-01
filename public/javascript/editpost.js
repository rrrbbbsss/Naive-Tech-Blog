async function editPostHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();
  const postId = document.location.pathname.split("/").splice(-1)[0];
  console.log(postId);
  if (!(title && content)) {
    alert("Please fill out the form");
    return;
  }
  const response = await fetch(`/api/post/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#post-form")
  .addEventListener("submit", editPostHandler);
