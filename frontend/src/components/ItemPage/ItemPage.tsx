import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "../../entities/Item";
import { io, Socket } from "socket.io-client";

const ItemPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);

  const socket: Socket = io("http://localhost:3001", {
    transports: ["websocket"],
    autoConnect: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/items/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setItem(await response.json());
      } catch (error) {
        setError("Network response was not ok");
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected!");
      console.log(item);
      // socket.emit("findAllBidsByItemId", { userId: 2 });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected!");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected!");
    });

    socket.on("findAllBidsByItemId", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      ItemPage Component
      <h2>{item?.title}</h2>
      <ul>
        {item?.bids?.map((bid) => {
          return <li key={bid.id}>{bid.price} $</li>;
        })}
      </ul>
    </div>
  );
};

export default ItemPage;
