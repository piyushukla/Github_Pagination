import React, { useState, useEffect } from "react";
import Display from "./Display_data";
import Pagination from "./Pagination";

function Fetch() {
  const [users, setUser] = useState([]);
  const [followUser, setFollowUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

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
      setPostsPerPage(5);
    } else if (users.length > 50 && users.length <= 100) {
      setPostsPerPage(10);
    } else {
      setPostsPerPage(20);
    }
  }, []);

  useEffect(() => {
    var temp = [];
    fetch("https://api.github.com/users/piyushukla/following", {
      method: "GET",
      headers: {
        Authorization: "token b61798a3f40cfe40a091e923375419f541bdcffc",
      },
    })
      .catch(() => {
        alert("This Operation failed please try Again !!!!");
      })
      .then((resp) => resp.json())
      .then((output) => {
        output.map((item) => {
          temp.push(item.login);
        });

        setFollowUser([...temp]);
      });
  }, []);

  function unfollow(index) {
    followUser.splice(index, 1);
    setFollowUser([...followUser]);
  }

  function follow(value) {
    console.log("val", value);
    setFollowUser([...followUser, value]);
  }
  //Get current posts

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <Display
        user={currentPosts}
        loading={loading}
        follow={followUser}
        remove={(index) => {
          unfollow(index);
        }}
        add={(value) => {
          follow(value);
        }}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={users.length}
        paginate={paginate}
      />
    </div>
  );
}
export default Fetch;
