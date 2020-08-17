import React, { useState, useEffect } from "react";

function Display(props, { loading }) {
  if (loading) {
    return <h2>Loading.......</h2>;
  }
  function unfollow(login) {
    fetch(`https://api.github.com/user/following/${login}`, {
      method: "DELETE",
      headers: {
        "Content-Length": 0,

        Authorization: "token b61798a3f40cfe40a091e923375419f541bdcffc",
      },
    })
      .catch(() => {
        alert("This Operation fail please try Again");
      })
      .then(() => {
        var index = props.follow.indexOf(login);
        props.remove(index);
      });
  }
  function follow(login) {
    fetch(`https://api.github.com/user/following/${login}`, {
      method: "PUT",
      headers: {
        "Content-Length": 0,

        Authorization: "token b61798a3f40cfe40a091e923375419f541bdcffc",
      },
    })
      .catch(() => {
        alert("This Operation failed please try Again");
      })
      .then(() => {
        props.add(login);
      });
  }

  return (
    <div
      className="list-group mb-4"
      style={{ width: "60%", marginLeft: "18%" }}
    >
      {props.user.map((item) => {
        return (
          <div
            className="media mt-1"
            style={{
              border: "0.5px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <img
              className="mr-3"
              style={{ width: "50px", margin: "5px" }}
              src={item.owner.avatar_url}
              alt="Generic placeholder image"
            />
            <div className="media-body">
              <h6 className="mt-2" style={{ fontSize: "1vw" }}>
                {item.full_name}
              </h6>
            </div>
            {props.follow.includes(item.owner.login) ? (
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  width: "70px",
                  width: "fix",
                  margin: "2px",
                  fontSize: "12px",
                }}
                onClick={() => {
                  unfollow(item.owner.login);
                }}
              >
                UnFollow
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "70px", margin: "2px", fontSize: "12px" }}
                onClick={() => {
                  follow(item.owner.login);
                }}
              >
                Follow
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
export default Display;
