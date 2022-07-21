import { VStack, Text, Box } from "native-base";

import { Header } from "../components/Header";

export function Details() {
  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>
      <Text>Detalhes</Text>
    </VStack>
  );
}
