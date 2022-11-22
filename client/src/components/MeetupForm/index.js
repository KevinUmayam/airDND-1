import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_MEETUP } from "../../utils/mutations";
import { QUERY_MEETUPS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const MeetupForm = () => {
  // const [thoughtText, setThoughtText] = useState("");

  const [meetupData, setmeetupData] = useState({
    dateTime: 0,
    campaignName: "",
    campaignDescription: "",
    campaignDuration: "",
    campaignPartySize: 0,
    meetupAddress: "",
    meetupCreatedAt: 0,
  });

  const [characterCount, setCharacterCount] = useState(0);

  const [addMeetup, { error }] = useMutation(ADD_MEETUP, {
    update(cache, { data: { addMeetup } }) {
      try {
        const { meetups } = cache.readQuery({ query: QUERY_MEETUPS });

        cache.writeQuery({
          query: QUERY_MEETUPS,
          data: { meetups: [addMeetup, ...meetups] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, meetups: [...me.meetups, addMeetup] } },
      });
    },
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setmeetupData({ ...meetupData, [name]: value });
    console.log(meetupData);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMeetup({
        variables: {
          ...meetupData,
          host: Auth.getProfile().data.username,
        },
      });

      setmeetupData({
        dateTime: 0,
        campaignName: "",
        campaignDescription: "",
        campaignDuration: "",
        campaignPartySize: 0,
        meetupAddress: "",
        meetupCreatedAt: 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // const handleChange = (event) => {
  //   // must be deleted
  //   const { name, value } = event.target;

  //   if (name === "meetupData.campaignDescription" && value.length <= 500) {
  //     setThoughtText(value);
  //     setCharacterCount(value.length);
  //   }
  // };
  // must be deleted
  return (
    <div>
      <h3>What's on DnD age?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="campaignDescription"
                placeholder="Here's a meetup..."
                value={meetupData.campaignDescription}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Thought
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default MeetupForm;
