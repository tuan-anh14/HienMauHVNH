//Pagination

document.addEventListener('DOMContentLoaded', () => {
    // Pagination
    const buttonsPagination = document.querySelectorAll("[data-pagination]");
    if(buttonsPagination) {
      let url = new URL(window.location.href);
  
      buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
          const page = button.getAttribute("data-pagination");
          url.searchParams.set("page", page);
          window.location.href = url.href;
        });
      });
    }
  
      }
);

  