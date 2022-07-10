document.addEventListener("DOMContentLoaded", () => {
  let profile = document.querySelector("#profile");
  let profileMenu = document.querySelector("#profile-menu");
  profile.addEventListener("click", (e) => {
    profileMenu.classList.toggle("scale-100");
  });
});
