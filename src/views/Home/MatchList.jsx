import React from "react";
import * as moment from "moment";
import PropTypes from "prop-types";

const MatchList = ({ matches }) => {
  // Sort matches by active property
  matches.sort((x, y) => parseInt(x.active) - parseInt(y.active));
  matches.sort((x, y) => parseInt(x.date) - parseInt(y.date));
  return (
    <ul>
      {matches.map(x => {
        let collapseID = `collapse_${x._id}`;
        let label = x.goalA
          ? `${x.goalA}-${x.goalB}`
          : moment(parseInt(x.date)).format("YYYY-MM-DD HH:mm");
        return (
          <div
            className="match-container border border-dark animated fadeIn mt-3"
            key={x._id}
          >
            <div className="d-flex justify-content-between information-container finishmatch">
              <div className="mobile-flag">
                <img
                  src="/img/Flags/fradi.png"
                  alt="flag"
                  className="img-flag"
                />
              </div>
              <div className="information align-self-center">{label}</div>
              <div className="mobile-flag">
                <img
                  src="/img/Flags/ujpest.png"
                  alt="flag"
                  className="img-flag"
                />
              </div>
            </div>
            <div className="simplebetting-container d-flex p-2">
              <div className="hometeam flex-fill text-right align-self-center">
                {x.teamA.name}
              </div>
              <div className="matchresult flex-fill text-center align-self-center">
                0
              </div>
              <div className="flex-fill text-center">
                <img
                  src="/img/Flags/fradi.png"
                  alt="flag"
                  className="img-flag desktop-flag"
                />
              </div>
              <div className="betting flex-fill text-center p-1 d-flex justify-content-around">
                <button type="button" className="btn btn-sm btn-primary">
                  1.23
                </button>
                <button type="button" className="btn btn-sm btn-primary">
                  2.23
                </button>
                <button type="button" className="btn btn-sm btn-primary">
                  3.21
                </button>
              </div>
              <div className="flex-fill text-center">
                <img
                  src="/img/Flags/ujpest.png"
                  alt="flag"
                  className="img-flag desktop-flag"
                />
              </div>
              <div className="matchresult flex-fill text-center align-self-center">
                1
              </div>
              <div className="awayteam flex-fill text-left align-self-center">
                {x.teamB.name}
              </div>
            </div>
            <div
              className="openmorebetting text-center p-1 border-top border-bottom d-flex align-items-center justify-content-center collapsed"
              data-toggle="collapse"
              href={"#" + collapseID}
              role="button"
              aria-expanded="false"
              aria-controls={collapseID}
            >
              További fogadások a mérkőzésre
              <i className="fa fa-chevron-down" aria-hidden="true" />
            </div>
            <div className="morebetting-container p-2 collapse" id={collapseID}>
              <p className="morebetting-title">KÉTESÉLY</p>
              <div className="morebetting-item d-flex mb-1 row">
                <div className="bettingbox flex-fill text-center d-flex border-right col-xs-12 col-sm-12 col-md-4">
                  <div className="morebetting-text flex-fill align-self-center">
                    Belgium vagy Döntetlen
                  </div>
                  <div className="flex-fill align-self-center">
                    <button type="button" className="btn btn-sm btn-primary">
                      1.23
                    </button>
                  </div>
                </div>
                <div className="bettingbox flex-fill text-center d-flex border-right col-xs-12 col-sm-12 col-md-4">
                  <div className="morebetting-text flex-fill align-self-center">
                    Belgium vagy Anglia
                  </div>
                  <div className="flex-fill align-self-center">
                    <button type="button" className="btn btn-sm btn-primary">
                      1.23
                    </button>
                  </div>
                </div>
                <div className="bettingbox flex-fill text-center d-flex col-xs-12 col-sm-12 col-md-4">
                  <div className="morebetting-text flex-fill align-self-center">
                    Döntetlen vagy Anglia
                  </div>
                  <div className="flex-fill align-self-center">
                    <button type="button" className="btn btn-sm btn-primary">
                      1.23
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <p className="morebetting-title">GÓLSZÁM 0,5</p>
              <div className="morebetting-item d-flex mb-1 row">
                <div className="bettingbox flex-fill text-center d-flex border-right col-xs-12 col-sm-4">
                  <div className="morebetting-text flex-fill align-self-center">
                    Kevesebb, mint 0,5
                  </div>
                  <div className="flex-fill align-self-center">
                    <button type="button" className="btn btn-sm btn-primary">
                      1.23
                    </button>
                  </div>
                </div>
                <div className="bettingbox flex-fill text-center d-flex col-xs-12 col-sm-4">
                  <div className="morebetting-text flex-fill align-self-center">
                    Több, mint 0,5
                  </div>
                  <div className="flex-fill align-self-center">
                    <button type="button" className="btn btn-sm btn-primary">
                      1.23
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

MatchList.propTypes = {
  matches: PropTypes.array.isRequired
};

export default MatchList;
