import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import Bid from "../../entities/Bid";
import Item from "../../entities/Item";
import Timer from "./Timer/Timer";

const ItemPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState<string | number>('');

  const socket: Socket = io("http://localhost:3001", {
    transports: ["websocket"],
    autoConnect: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Item>(`http://localhost:3001/items/${id}`);
        setItem(response.data);
        console.log(response.data);
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
      socket.emit("joinAuction", id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected!");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    const handleNewBid = (bid: Bid) => {
      setItem((prevItem) => {
        if (prevItem) {
          return {
            ...prevItem,
            bids: [bid, ...prevItem.bids],
          };
        }
        return prevItem;
      });
    };

    socket.on("newBid", handleNewBid);

    return () => {
      socket.off("newBid", handleNewBid);
    };
  }, []);

  const createBid = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/bids', { price, itemId: id });
      setPrice('');
      setError(null);
    } catch (error) {
      console.error('Error creating bid:', error);
      setError('Failed to create bid. Please try again.');
    }
  };

  return (
    <div>
      <h2>{item?.title}</h2>
      {item && <Timer deadline={item.deadline} />}
      <ul>Bids
        {item?.bids?.map((bid) => (
          <li key={bid.id}>{bid.price} $</li>
        ))}
        {item?.bids.length! < 10 && <li>{item?.startPrice} $ - start price</li>}
      </ul>
      <form onSubmit={createBid}>
        <input 
          type="number" 
          name="price"
          value={price} 
          onChange={(e) => setPrice(Number(e.target.value))} 
        />
        <button type="submit">Bid</button>
        {error && <p>{error}</p>} 
      </form>
    </div>
  );
};

export default ItemPage;