import React, {useEffect, useState} from "react";
import "../../assets/css/tournamentchart.css";
import { getTeams } from "../../_service/api-public-func";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// reactstrap components
import {
  Input
} from "reactstrap";
import { gettabelladata, settabella } from "../../_service/api-func";

const TournamentChartEdit = ({authctx}) => {
  const [teamsdata, setTeamsdata] = useState([]);
  const [tabelladata, settabelladata] = useState([]);

  useEffect(() => {
    const loadTeams = async () => {
      const resultPromise = await getTeams();
      setTeamsdata(resultPromise.data);
    };

    const loadTabelladata = async () => {
      const resultPromise = await gettabelladata();
      settabelladata(resultPromise.data);
    };

    loadTeams();
    loadTabelladata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    console.log(tabelladata);
    var savetabella = await settabella(tabelladata);
    console.log("Kész: "+savetabella);
  };

  const handleChange = (e,date="date") => {
    const { name, value } = e.target;
    let property = e.target.dataset.property;
    if(typeof property === "undefined"){
      property = date;
    }
    var copydata = [...tabelladata];
    copydata[parseInt(name)][property] = value; 
    settabelladata(copydata);
  };

  if(tabelladata.length > 0){
    return (
      <div className="brackets_container brackets_container_admin">
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
                    <span className="admin-selectContainer">
                        <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[0].team._id}
                          name="0"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[0].score}
                          name="0"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[0].result}
                          name="0"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="10">
                    <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[1].team._id}
                          name="1"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[1].score}
                          name="1"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[1].result}
                          name="1"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                    <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="1"
                        defaultValue={tabelladata[1].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="11">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[2].team._id}
                          name="2"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[2].score}
                          name="2"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[2].result}
                          name="2"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="12">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[3].team._id}
                          name="3"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[3].score}
                          name="3"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[3].result}
                          name="3"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="3"
                        defaultValue={tabelladata[3].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="13">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[4].team._id}
                          name="4"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[4].score}
                          name="4"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[4].result}
                          name="4"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="14">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[5].team._id}
                          name="5"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[5].score}
                          name="5"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[5].result}
                          name="5"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="5"
                        defaultValue={tabelladata[5].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="16">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[6].team._id}
                          name="6"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[6].score}
                          name="6"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[6].result}
                          name="6"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="15">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[7].team._id}
                          name="7"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[7].score}
                          name="7"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[7].result}
                          name="7"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="7"
                        defaultValue={tabelladata[7].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="round_column r_8">
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="9">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[8].team._id}
                          name="8"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[8].score}
                          name="8"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[8].result}
                          name="8"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="12">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[9].team._id}
                          name="9"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[9].score}
                          name="9"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[9].result}
                          name="9"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="9"
                        defaultValue={tabelladata[9].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="14">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[10].team._id}
                          name="10"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[10].score}
                          name="10"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[10].result}
                          name="10"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="16">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[11].team._id}
                          name="11"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[11].score}
                          name="11"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[11].result}
                          name="11"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="11"
                        defaultValue={tabelladata[11].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="round_column r_4">
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="9">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[12].team._id}
                          name="12"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[12].score}
                          name="12"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[12].result}
                          name="12"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="16">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[13].team._id}
                          name="13"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[13].score}
                          name="13"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[13].result}
                          name="13"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="13"
                        defaultValue={tabelladata[13].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="round_column r_2 final">
              <div className="winner_team">
                <span className="admin-selectContainer">
                  GYŐZTES
                  <span style={{display: "block"}}>
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[14].team._id}
                          name="14"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[14].score}
                          name="14"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[14].result}
                          name="14"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                </span>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div
                    className="m_segment m_top winner first"
                    data-team-id="9"
                  >
                    <span>
                    <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          style={{display: "block", width: "100%"}}
                          value={tabelladata[15].team._id}
                          name="15"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          style={{display: "block", width: "100%"}}
                          onChange={handleChange}
                          value={tabelladata[15].score}
                          name="15"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          style={{display: "block", width: "100%"}}
                          value={tabelladata[15].result}
                          name="15"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                    </span>
                  </div>
                  <div
                    className="m_segment m_botm winner second"
                    data-team-id="2"
                  >
                    <span>
                    <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          style={{display: "block", width: "100%"}}
                          value={tabelladata[16].team._id}
                          name="16"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          style={{display: "block", width: "100%"}}
                          onChange={handleChange}
                          value={tabelladata[16].score}
                          name="16"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          style={{display: "block", width: "100%"}}
                          value={tabelladata[16].result}
                          name="16"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="16"
                        defaultValue={tabelladata[16].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
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
                    <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          style={{display: "block", width: "100%"}}
                          value={tabelladata[17].team._id}
                          name="17"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          style={{display: "block", width: "100%"}}
                          onChange={handleChange}
                          value={tabelladata[17].score}
                          name="17"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          style={{display: "block", width: "100%"}}
                          value={tabelladata[17].result}
                          name="17"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                    </span>
                  </div>
                  <div
                    className="m_segment m_top losers fourth"
                    data-team-id="8"
                  >
                    <span>
                    <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          style={{display: "block", width: "100%"}}
                          value={tabelladata[18].team._id}
                          name="18"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          style={{display: "block", width: "100%"}}
                          onChange={handleChange}
                          value={tabelladata[18].score}
                          name="18"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          style={{display: "block", width: "100%"}}
                          value={tabelladata[18].result}
                          name="18"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="18"
                        defaultValue={tabelladata[18].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="round_column r_4 reversed">
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="9">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[19].team._id}
                          name="19"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[19].score}
                          name="19"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[19].result}
                          name="19"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="16">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[20].team._id}
                          name="20"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[20].score}
                          name="20"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[20].result}
                          name="20"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="20"
                        defaultValue={tabelladata[20].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="round_column r_8 reversed">
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="9">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[21].team._id}
                          name="21"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[21].score}
                          name="21"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[21].result}
                          name="21"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="12">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[22].team._id}
                          name="22"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[22].score}
                          name="22"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[22].result}
                          name="22"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="22"
                        defaultValue={tabelladata[22].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="14">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[23].team._id}
                          name="23"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[23].score}
                          name="23"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[23].result}
                          name="23"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="16">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[24].team._id}
                          name="24"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[24].score}
                          name="24"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[24].result}
                          name="24"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="24"
                        defaultValue={tabelladata[24].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="round_column r_16 reversed">
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="9">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[25].team._id}
                          name="25"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[25].score}
                          name="25"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[25].result}
                          name="25"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="10">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[26].team._id}
                          name="26"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[26].score}
                          name="26"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[26].result}
                          name="26"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="26"
                        defaultValue={tabelladata[26].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="11">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[27].team._id}
                          name="27"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[27].score}
                          name="27"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[27].result}
                          name="27"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="12">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[28].team._id}
                          name="28"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[28].score}
                          name="28"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[28].result}
                          name="28"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="28"
                        defaultValue={tabelladata[28].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top loser" data-team-id="13">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[29].team._id}
                          name="29"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[29].score}
                          name="29"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[29].result}
                          name="29"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm winner" data-team-id="14">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[30].team._id}
                          name="30"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[30].score}
                          name="30"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[30].result}
                          name="30"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="30"
                        defaultValue={tabelladata[30].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
              <div className="mtch_container">
                <div className="match_unit">
                  <div className="m_segment m_top winner" data-team-id="16">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[31].team._id}
                          name="31"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[31].score}
                          name="31"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[31].result}
                          name="31"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_segment m_botm loser" data-team-id="15">
                  <span className="admin-selectContainer">
                    <Input
                          type="select"
                          className="admin-selectStyle"
                          value={tabelladata[32].team._id}
                          name="32"
                          data-property="team"
                          onChange={handleChange}
                          >
                          <option value="0">Csapat...</option>
                          {teamsdata.map(team => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </Input>
                        <Input
                          className="admin-inputStyle"
                          onChange={handleChange}
                          value={tabelladata[32].score}
                          name="32"
                          data-property="score"
                          type="text"
                        />
                        <Input
                          type="select"
                          className="admin-selectresultStyle"
                          value={tabelladata[32].result}
                          name="32"
                          data-property="result"
                          onChange={handleChange}
                          >
                          <option value="0">Kikapcsolva</option>
                          <option value="1">Várakozik</option>
                          <option value="2">Nyert</option>
                          <option value="3">Vesztett</option>
                        </Input>
                    </span>
                  </div>
                  <div className="m_dtls">
                  <span>
                    <TextField
                        className="admin-datetimepicker"
                        type="datetime-local"
                        onChange={(e)=>handleChange(e,"date")}
                        name="32"
                        defaultValue={tabelladata[32].date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />  
                    </span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <Button variant="outlined" onClick={handleSubmit}>Mentés</Button>
      </div>
    </div>
    );
  }
  
  return "Loading..."
};

export default TournamentChartEdit;
