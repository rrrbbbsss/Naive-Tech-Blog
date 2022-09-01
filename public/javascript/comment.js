async function newCommentHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector("#comment-text").value.trim();
  const post_id = document.location.pathname.split("/").splice(-1)[0];
  if (!comment_text) {
    alert("Please fill out the form");
    return;
  }
  const response = await fetch(`/api/comment`, {
    method: "POST",
    body: JSON.stringify({
      comment_text,
      post_id,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#comment-form")
  .addEventListener("submit", newCommentHandler);
