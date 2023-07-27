import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

var colors = [
  "#380015",
  "#38002f",
  "#1c0038",
  "#000038",
  "#002338",
  "#003821",
  "#313800",
  "#380100",
];
var random_color = colors[Math.floor(Math.random() * colors.length)];
const useStyles = makeStyles((theme) => ({
  channelDiv: {
    padding: "25px",
  },
  channelContent: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    padding: "20px",
    alignItems: "center",
  },
  square: {
    height: "80px",
    width: "80px",
    backgroundColor: random_color,
    fontSize: "2rem",
    borderRadius: "10px",
  },
  channelText: {
    paddingTop: "10px",
    fontSize: "1.2rem",
    textTransform: "capitalize",
  },
  channelCard: {
    backgroundColor: "#1e2439",
    boxShadow:
      "10px 10px 10px 5px rgb(0 0 0 / 17%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    color: "rgb(220, 221, 222)",
    borderRadius: "5px",
  },
}));

function ChannelCard({ name, id }) {
  console.log(name);
  const classes = useStyles();
  const history = useHistory();

  const goToChannel = (id) => {
    history.push(`/channel/${id}`);
  };
  return (
    <Grid item xs={6} md={3} className={classes.channelDiv} key={id}>
      <Card className={classes.channelCard}>
        <CardActionArea
          style={{ display: "flex" }}
          onClick={() => goToChannel(id)}
        >
          <CardContent className={classes.channelContent}>
            <Avatar variant="square" className={classes.square}>
              {name.substr(0, 2).toUpperCase()}
            </Avatar>
            <Typography className={classes.channelText}>{name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
export default ChannelCard;
