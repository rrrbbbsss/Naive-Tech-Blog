async function newPostHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();
  if (!(title && content)) {
    alert("Please fill out the form");
    return;
  }
  const response = await fetch(`/api/post`, {
    method: "POST",
    body: JSON.stringify({
      title: title.trim(),
      content: content.trim(),
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#post-form").addEventListener("submit", newPostHandler);
