import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { ReactComponent as FileImage } from "../../Assets/icons/fileImage.svg";

function ProjectPage() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      {/* Projects Section */}
      <Container>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" gutterBottom>
            Dự án của tôi
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  bgcolor: "purple.main",
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  Dự án mới
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent className="relative">
                  {/* Sử dụng Icon component để hiển thị SVG */}
                  <Typography variant="h6">test</Typography>
                  <FileImage
                    className=" block overflow-visible fill-black object-contain w-[50px] h-[50px]"
                    fill="#333"
                  />
                  <Typography color="textSecondary" className="text-right">
                    10 phút trước
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default ProjectPage;
