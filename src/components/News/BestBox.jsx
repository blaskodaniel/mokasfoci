import React from "react";
import Avatar from "@material-ui/core/Avatar";

const BestBox = (props) => {
    return (
        <div className="containernews">
            {props.single ? 
               <React.Fragment>
               <Avatar
                    className="player_avatar avatar"
                    alt="player avatar"
                    src={`/avatars/${props.data ? props.data[0].avatar : "player.png"}`}
                />
                <div className="textcont">
                    <div className="title">{props.title}</div>
                    <div className="name">{props.data ? props.data[0].name : "Loading..."}</div>
                    <div className="score">{props.data ? props.data[0].score+" pont" : "Loading..."}</div>
                </div>
                </React.Fragment>
                :
                <React.Fragment>
                {props.data.map((player,index)=>{
                    return <Avatar
                      key={index}
                      className="player_avatar avatar"
                      style={{marginLeft: index > 0 ? "-25px": "0"}}
                      alt="player avatar"
                      src={`/avatars/${player ? player.avatar : "player.png"}`}
                    />
                })}
                <div className="textcont">
                    <div className="title">Legtöbbször nyert</div>
                    {props.data.map((player,index)=>{
                        return(
                           <div key={index} className="name">{player ? player.name : "Loading..."}</div>
                        )
                    })}
                    <div className="score">{props.data ? props.data[0].count + " nyertes szelvény" : "Loading..."}</div>
                </div>
                </React.Fragment> 
            }
            
        </div>
    )
}

export default BestBox