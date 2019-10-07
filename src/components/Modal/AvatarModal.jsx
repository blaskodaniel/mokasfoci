import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactDOM from "react-dom";
import uuidv1 from "uuid/v1";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getAvatars } from "../../_service/api-public-func";

const useStyles = makeStyles({
  avatar: {
    "&:hover": {
      cursor: "pointer"
    },
    margin: 10
  }
});

const AvatarModal = ({ isShowing, hide, savefunc }) => {
  const classes = useStyles();
  const [avatarList, setavatarList] = useState([]);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const loadAvatars = async () => {
      const resultPromise = await getAvatars();
      setavatarList(resultPromise.data);
    };
    loadAvatars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <Modal
            className="avatarModal"
            isOpen={isShowing}
            fade={false}
            toggle={hide}
            backdrop={false}
          >
            <ModalHeader toggle={hide}>Válassz avatart</ModalHeader>
            <ModalBody>
              <Grid container direction="row" justify="center">
                {avatarList.map(img => {
                  return (
                    <Grid key={uuidv1()} item style={{ alignSelf: "center" }}>
                      <Avatar
                        alt={img.name}
                        src={process.env.PUBLIC_URL + "avatars/" + img.name}
                        onClick={() => setAvatar(img.name)}
                        className={classes.avatar}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </ModalBody>
            <ModalFooter>
              <Avatar
                alt={avatar}
                src={process.env.PUBLIC_URL + "avatars/" + avatar}
                className={classes.avatar}
              />
              <Button onClick={() => savefunc(avatar)}>Mentés</Button>
            </ModalFooter>
          </Modal>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default AvatarModal;
