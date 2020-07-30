import React, {useState, useEffect} from "react";
import "../../assets/css/tournamentchart.css";
import moment from 'moment';
import { gettabelladata } from '../../_service/api-func';

const TournamentChart = ({authctx}) => {
  const [tabelladata, settabelladata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const loadTabelladata = async () => {
      const resultPromise = await gettabelladata();
      settabelladata(resultPromise.data);
      setloading(false)
    };

    loadTabelladata();
    return () => { console.log("Cleanup function") }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(tabelladata.length > 0 && !loading){
  return (
    <div className="brackets_container">
      <table>
        <thead>
          <tr>
            <th>
              <span>Nyolcaddöntő</span>
            </th>
            <th>
              <span>Negyeddöntő</span>
            </th>
            <th>
              <span>Elődöntő</span>
            </th>
            <th>
              <span>Döntő</span>
            </th>
            <th>
              <span>Elődöntő</span>
            </th>
            <th>
              <span>Negyeddöntő</span>
            </th>
            <th>
              <span>Nyolcaddöntő</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr id="playground">
            <td className="round_column r_16">
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="9">
                    <span>
                      <img
                        src={tabelladata[0].result !== 0 ? `flags/${tabelladata[0].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[0].result !== 0 ? tabelladata[0].team.name : "-"}</span>
                      <strong>{tabelladata[0].result === 2 || tabelladata[0].result === 3 ? tabelladata[0].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="10">
                    <span>
                    <img
                        src={tabelladata[1].result !== 0 ? `flags/${tabelladata[1].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[1].result !== 0 ? tabelladata[1].team.name : "-"}</span>
                      <strong>{tabelladata[1].result === 2 || tabelladata[1].result === 3 ? tabelladata[1].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[1].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="11">
                    <span>
                    <img
                        src={tabelladata[2].result !== 0 ? `flags/${tabelladata[2].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[2].result !== 0 ? tabelladata[2].team.name : "-"}</span>
                      <strong>{tabelladata[2].result === 2 || tabelladata[2].result === 3 ? tabelladata[2].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="12">
                    <span>
                    <img
                        src={tabelladata[3].result !== 0 ? `flags/${tabelladata[3].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[3].result !== 0 ? tabelladata[3].team.name : "-"}</span>
                      <strong>{tabelladata[3].result === 2 || tabelladata[3].result === 3 ? tabelladata[3].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[3].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="13">
                    <span>
                    <img
                        src={tabelladata[4].result !== 0 ? `flags/${tabelladata[4].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[4].result !== 0 ? tabelladata[4].team.name : "-"}</span>
                      <strong>{tabelladata[4].result === 2 || tabelladata[4].result === 3 ? tabelladata[4].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="14">
                    <span>
                    <img
                        src={tabelladata[5].result !== 0 ? `flags/${tabelladata[5].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[5].result !== 0 ? tabelladata[5].team.name : "-"}</span>
                      <strong>{tabelladata[5].result === 2 || tabelladata[5].result === 3 ? tabelladata[5].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[5].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="16">
                    <span>
                      <img
                        src={tabelladata[6].result !== 0 ? `flags/${tabelladata[6].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[6].result !== 0 ? tabelladata[6].team.name : "-"}</span>
                      <strong>{tabelladata[6].result === 2 || tabelladata[6].result === 3 ? tabelladata[6].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="15">
                    <span>
                      <img
                        src={tabelladata[7].result !== 0 ? `flags/${tabelladata[7].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[7].result !== 0 ? tabelladata[7].team.name : "-"}</span>
                      <strong>{tabelladata[7].result === 2 || tabelladata[7].result === 3 ? tabelladata[7].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[7].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="round_column r_8">
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="9">
                    <span>
                      <img
                        src={tabelladata[8].result !== 0 ? `flags/${tabelladata[8].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[8].result !== 0 ? tabelladata[8].team.name : "-"}</span>
                      <strong>{tabelladata[8].result === 2 || tabelladata[8].result === 3 ? tabelladata[8].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="12">
                    <span>
                      <img
                        src={tabelladata[9].result !== 0 ? `flags/${tabelladata[9].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[9].result !== 0 ? tabelladata[9].team.name : "-"}</span>
                      <strong>{tabelladata[9].result === 2 || tabelladata[9].result === 3 ? tabelladata[9].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[9].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="14">
                    <span>
                      <img
                        src={tabelladata[10].result !== 0 ? `flags/${tabelladata[10].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[10].result !== 0 ? tabelladata[10].team.name : "-"}</span>
                      <strong>{tabelladata[10].result === 2 || tabelladata[10].result === 3 ? tabelladata[10].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="16">
                    <span>
                      <img
                        src={tabelladata[11].result !== 0 ? `flags/${tabelladata[11].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[11].result !== 0 ? tabelladata[11].team.name : "-"}</span>
                      <strong>{tabelladata[11].result === 2 || tabelladata[11].result === 3 ? tabelladata[11].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[11].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="round_column r_4">
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="9">
                    <span>
                      <img
                        src={tabelladata[12].result !== 0 ? `flags/${tabelladata[12].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[12].result !== 0 ? tabelladata[12].team.name : "-"}</span>
                      <strong>{tabelladata[12].result === 2 || tabelladata[12].result === 3 ? tabelladata[12].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="16">
                    <span>
                      <img
                        src={tabelladata[13].result !== 0 ? `flags/${tabelladata[13].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[13].result !== 0 ? tabelladata[13].team.name : "-"}</span>
                      <strong>{tabelladata[13].result === 2 || tabelladata[13].result === 3 ? tabelladata[13].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[13].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="round_column r_2 final">
              <div className="winner_team">
                <span>
                  GYŐZTES
                  <a href="#/">
                    <img
                        src={tabelladata[14].result !== 0 ? `flags/${tabelladata[14].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[14].result !== 0 ? tabelladata[14].team.name : "-"}</span>
                  </a>
                </span>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div
                    className="m_segment m_top winner first"
                    data-team-id="9"
                  >
                    <span>
                    <a href="#/">
                      <img
                        src={tabelladata[15].result !== 0 ? `flags/${tabelladata[15].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[15].result !== 0 ? tabelladata[15].team.name : "-"}</span>
                      <strong>{tabelladata[15].result === 2 || tabelladata[15].result === 3 ? tabelladata[15].score : "-"}</strong>
                      </a>
                    </span>
                  </div>
                  <div
                    className="m_segment m_botm winner second"
                    data-team-id="2"
                  >
                    <span>
                    <a href="#/">
                      <img
                        src={tabelladata[16].result !== 0 ? `flags/${tabelladata[16].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[16].result !== 0 ? tabelladata[16].team.name : "-"}</span>
                      <strong>{tabelladata[16].result === 2 || tabelladata[16].result === 3 ? tabelladata[16].score : "-"}</strong>
                      </a>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[16].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container third_position">
                <div className="match_unit">
                  <div
                    className="m_segment m_botm winner third"
                    data-team-id="16"
                  >
                    <span>
                    <a href="#/">
                      <img
                        src={tabelladata[17].result !== 0 ? `flags/${tabelladata[17].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[17].result !== 0 ? tabelladata[17].team.name : "-"}</span>
                      <strong>{tabelladata[17].result === 2 || tabelladata[17].result === 3 ? tabelladata[17].score : "-"}</strong>
                      </a>
                    </span>
                  </div>
                  <div
                    className="m_segment m_top losers fourth"
                    data-team-id="8"
                  >
                    <span>
                    <a href="#/">
                      <img
                        src={tabelladata[18].result !== 0 ? `flags/${tabelladata[18].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[18].result !== 0 ? tabelladata[18].team.name : "-"}</span>
                      <strong>{tabelladata[18].result === 2 || tabelladata[18].result === 3 ? tabelladata[18].score : "-"}</strong>
                      </a>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[18].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="round_column r_4 reversed">
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="9">
                    <span>
                      <img
                        src={tabelladata[19].result !== 0 ? `flags/${tabelladata[19].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[19].result !== 0 ? tabelladata[19].team.name : "-"}</span>
                      <strong>{tabelladata[19].result === 2 || tabelladata[19].result === 3 ? tabelladata[19].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="16">
                    <span>
                      <img
                        src={tabelladata[20].result !== 0 ? `flags/${tabelladata[20].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[20].result !== 0 ? tabelladata[20].team.name : "-"}</span>
                      <strong>{tabelladata[20].result === 2 || tabelladata[20].result === 3 ? tabelladata[20].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[20].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="round_column r_8 reversed">
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="9">
                    <span>
                      <img
                        src={tabelladata[21].result !== 0 ? `flags/${tabelladata[21].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[21].result !== 0 ? tabelladata[21].team.name : "-"}</span>
                      <strong>{tabelladata[21].result === 2 || tabelladata[21].result === 3 ? tabelladata[21].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="12">
                    <span>
                      <img
                        src={tabelladata[22].result !== 0 ? `flags/${tabelladata[22].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[22].result !== 0 ? tabelladata[22].team.name : "-"}</span>
                      <strong>{tabelladata[22].result === 2 || tabelladata[22].result === 3 ? tabelladata[22].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[22].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="14">
                    <span>
                      <img
                        src={tabelladata[23].result !== 0 ? `flags/${tabelladata[23].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[23].result !== 0 ? tabelladata[23].team.name : "-"}</span>
                      <strong>{tabelladata[23].result === 2 || tabelladata[23].result === 3 ? tabelladata[23].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="16">
                    <span>
                      <img
                        src={tabelladata[24].result !== 0 ? `flags/${tabelladata[24].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[24].result !== 0 ? tabelladata[24].team.name : "-"}</span>
                      <strong>{tabelladata[24].result === 2 || tabelladata[24].result === 3 ? tabelladata[24].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[24].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="round_column r_16 reversed">
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="9">
                    <span>
                      <img
                        src={tabelladata[25].result !== 0 ? `flags/${tabelladata[25].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[25].result !== 0 ? tabelladata[25].team.name : "-"}</span>
                      <strong>{tabelladata[25].result === 2 || tabelladata[25].result === 3 ? tabelladata[25].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="10">
                    <span>
                      <img
                        src={tabelladata[26].result !== 0 ? `flags/${tabelladata[26].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[26].result !== 0 ? tabelladata[26].team.name : "-"}</span>
                      <strong>{tabelladata[26].result === 2 || tabelladata[26].result === 3 ? tabelladata[26].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[26].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="11">
                    <span>
                      <img
                        src={tabelladata[27].result !== 0 ? `flags/${tabelladata[27].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[27].result !== 0 ? tabelladata[27].team.name : "-"}</span>
                      <strong>{tabelladata[27].result === 2 || tabelladata[27].result === 3 ? tabelladata[27].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="12">
                    <span>
                      <img
                        src={tabelladata[28].result !== 0 ? `flags/${tabelladata[28].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[28].result !== 0 ? tabelladata[28].team.name : "-"}</span>
                      <strong>{tabelladata[28].result === 2 || tabelladata[28].result === 3 ? tabelladata[28].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[28].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="13">
                    <span>
                      <img
                        src={tabelladata[29].result !== 0 ? `flags/${tabelladata[29].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[29].result !== 0 ? tabelladata[29].team.name : "-"}</span>
                      <strong>{tabelladata[29].result === 2 || tabelladata[29].result === 3 ? tabelladata[29].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="14">
                    <span>
                      <img
                        src={tabelladata[30].result !== 0 ? `flags/${tabelladata[30].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[30].result !== 0 ? tabelladata[30].team.name : "-"}</span>
                      <strong>{tabelladata[30].result === 2 || tabelladata[30].result === 3 ? tabelladata[30].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[30].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="16">
                    <span>
                      <img
                        src={tabelladata[31].result !== 0 ? `flags/${tabelladata[31].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[31].result !== 0 ? tabelladata[31].team.name : "-"}</span>
                      <strong>{tabelladata[31].result === 2 || tabelladata[31].result === 3 ? tabelladata[31].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="15">
                    <span>
                      <img
                        src={tabelladata[32].result !== 0 ? `flags/${tabelladata[32].team.flag}` : "img/question.png"}
                        alt="no"
                        className="flag"
                      />
                      <span>{tabelladata[32].result !== 0 ? tabelladata[32].team.name : "-"}</span>
                      <strong>{tabelladata[32].result === 2 || tabelladata[32].result === 3 ? tabelladata[32].score : "-"}</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>{moment(tabelladata[32].date).format("MMM Do, ddd HH:mm")}</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  }
  
  if(loading){
    return <p>Betöltés...</p>
  }

  if(tabelladata.length === 0 && !loading){
    return <p>Nincs adat a tabellához</p>
  }

  return <p>Valami hiba történt</p>
};

export default TournamentChart;
