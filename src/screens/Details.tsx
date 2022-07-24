import { useEffect, useState } from "react";
import { VStack, Text, Box } from "native-base";
import firestore from "@react-native-firebase/firestore";
import { OrderFirestoreDTO } from "../DTOs/OrderFirestoreDTO";
import { useRoute } from "@react-navigation/native";

import { Header } from "../components/Header";
import { OrderProps } from "../components/Order";
import { Loading } from "../components/Loading";
import { dateFormat } from "../utils/firestoreDateFormat";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
  const [solution, setSolution] = useState("");
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution,
        } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });

        console.log({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });

        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>
      <Text color="white">{orderId}</Text>
    </VStack>
  );
}
