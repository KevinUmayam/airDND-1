import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CharForm from "../components/CharForm";
import CharCard from "../components/CharCard";
import MeetupForm from "../components/MeetupForm";
import MeetuptList from "../components/MeetuptList";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import { setContext } from "@apollo/client/link/context";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  console.log(user);
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  } 

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam)


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        {/* CharForm */}
        <div className="column">
          <div className={userParam ? "hidden" : "display" }>
            <CharForm />
          </div>
          
          <CharCard username={user.username} />
          <br />
        </div>
        {/* CharForm */}
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <MeetuptList
            meetups={user.meetups}
            title={`${user.username}'s meetups...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: "1px dotted #1a1a1a" }}
          >
            <MeetupForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;