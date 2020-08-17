import React from "react";

const Pagination = ({ usersPerPage, totalusers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalusers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ float: "right", position: "relative", marginRight: "242px" }}>
      <nav>
        <ul className="pagination" style={{ alignContent: "center" }}>
          {pageNumbers.map((number) => {
            return (
              <li key={number} className="page-item">
                <a
                  onClick={() => paginate(number)}
                  href="!#"
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
