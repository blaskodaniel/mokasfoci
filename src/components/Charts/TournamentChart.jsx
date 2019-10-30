import React from "react";
import "../../assets/css/tournamentchart.css";

const TournamentChart = () => {
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
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Brazil</span>
                      <strong>4</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="10">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Canada</span>
                      <strong>2</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="11">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Germany</span>
                      <strong>0</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="12">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Italy</span>
                      <strong>2</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="13">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Hungary</span>
                      <strong>2</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="14">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Ghana</span>
                      <strong>5</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="16">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>England</span>
                      <strong>0</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="15">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Sweden</span>
                      <strong>0</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
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
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Brazil</span>
                      <strong>4</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="12">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Italy</span>
                      <strong>2</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="14">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Ghana</span>
                      <strong>1</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="16">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>England</span>
                      <strong>3</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
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
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Brazil</span>
                      <strong>4</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="16">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>England</span>
                      <strong>3</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
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
                      src={"flags/brazil.png"}
                      alt="Brazil"
                      className="flag"
                    />
                    <span>Brazil</span>
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
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Brazil</span>
                      <strong>4</strong>
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
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Algeria</span>
                      <strong>3</strong>
                      </a>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
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
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>England</span>
                      <strong>3</strong>
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
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Saudi</span>
                      <strong>2</strong>
                      </a>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
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
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Brazil</span>
                      <strong>4</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="16">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>England</span>
                      <strong>3</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
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
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Brazil</span>
                      <strong>4</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="12">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Italy</span>
                      <strong>2</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="14">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Ghana</span>
                      <strong>1</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="16">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>England</span>
                      <strong>3</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
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
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Brazil</span>
                      <strong>4</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="10">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Canada</span>
                      <strong>2</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="11">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Germany</span>
                      <strong>0</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="12">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Italy</span>
                      <strong>2</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="13">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Hungary</span>
                      <strong>2</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="14">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Ghana</span>
                      <strong>5</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="16">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>England</span>
                      <strong>0</strong>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="15">
                    <span>
                      <img
                        src={"flags/brazil.png"}
                        alt="Brazil"
                        className="flag"
                      />
                      <span>Sweden</span>
                      <strong>0</strong>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>June 10, 2015 - 8:00 pm</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TournamentChart;
