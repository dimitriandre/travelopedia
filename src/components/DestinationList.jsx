import React from "react";
import {
  useGetAllDestinationQuery,
  useDeleteDestinationMutation,
} from "../api/destinationApi";

function DestinationList() {
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllDestinationQuery();
  const [deleteDestination] = useDeleteDestinationMutation();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = data.map((destination) => {
      return (
        <article key={destination.id}>
          <div className="text-center text-info p-2">
            <div className="text-center row">
              <div className="col-2 offset-3">
                {destination.city}, {destination.country}
              </div>
              <div className="col-2">{destination.daysNeeded} days</div>
              <button
                className="btn btn-danger col-2"
                onClick={() => deleteDestination({ id: destination.id })}
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return <div className="pt-3">{content}</div>;
}

export default DestinationList;
