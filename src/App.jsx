import { Stack, Typography } from "@mui/material";
import BasicTable from "./components/BasicTable";

function App() {
  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h3">Car Data Table</Typography>
      <BasicTable />
    </Stack>
  );
}

export default App;
