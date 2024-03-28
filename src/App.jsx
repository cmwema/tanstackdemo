import { Stack, Typography } from "@mui/material";
import BasicTable from "./components/BasicTable";

function App() {
  return (
    <Stack spacing={2}>
      <Typography variant="h3">React Table</Typography>
      <BasicTable />
    </Stack>
  );
}

export default App;
