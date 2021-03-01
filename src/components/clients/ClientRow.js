import React from "react";
import ClientData from "./ClientData";

const ClientRow = ({ clients, toggleEditClient }) => {
  return (
    <tbody>
      {clients &&
        clients.map((c) => {
          return (
            <ClientData
              id={c._id}
              key={c._id}
              name={c.name}
              country={c.country}
              firstContact={c.firstContact}
              emailType={c.emailType}
              sold={c.sold}
              owner={c.owner}
              toggleEditClient={toggleEditClient}
            />
          );
        })}
    </tbody>
  );
};

export default ClientRow;
