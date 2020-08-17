import React, { useState, useEffect } from "react";
import Display from "./Display_data";
import Pagination from "./Pagination";
import config from "../config/index.json";
import { ThemeProvider } from "react-bootstrap";

function Fetch() {
  const [users, setUser] = useState([]);
  const [userFollowed, setUserFollowed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  // const [indexOfLastPost, setIndexOfLast] = useState();
  // const [indexOfFirstPost, setIndexOfFirst] = useState();
  // const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/repos/facebook/react/forks")
      .then((resp) => resp.json())
      .then((output) => {
        setUser(output);
        setLoading(false);
      })
      .catch(() => {
        alert("This Operation fail please try later");
      });
    if (users.length < 50) {
      setUsersPerPage(5);
    } else if (users.length > 50 && users.length <= 100) {
      setUsersPerPage(10);
    } else {
      setUsersPerPage(20);
    }
  }, []);

  useEffect(() => {
    var temp = [];
    fetch("https://api.github.com/users/piyushukla/following", {
      method: "GET",
      headers: {
        Authorization: `token ${config.token}`,
      },
    })
      .catch(() => {
        alert("This Operation failed please try Again !!!!");
      })
      .then((resp) => resp.json())
      .then((output) => {
        console.log("output", output);
        output.map((item) => {
          temp.push(item.login);
        });

        setUserFollowed([...temp]);
      });
  }, []);

  function unfollow(index) {
    userFollowed.splice(index, 1);
    setUserFollowed([...userFollowed]);
  }

  function follow(value) {
    setUserFollowed([...userFollowed, value]);
  }
  //Get current posts
  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUser = users.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(indexOfFirstPost, indexOfLastPost, currentUser);
  return (
    <div className="container mt-5">
      <Display
        user={currentUser}
        loading={loading}
        userFollowed={userFollowed}
        remove={(index) => {
          unfollow(index);
        }}
        add={(value) => {
          follow(value);
        }}
      />
      <Pagination
        usersPerPage={usersPerPage}
        totalusers={users.length}
        paginate={paginate}
      />
    </div>
  );
}
export default Fetch;
