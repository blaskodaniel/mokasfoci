import React from "react";
import "./Comingsoon.css";
import moment from 'moment'
import Grid from '@material-ui/core/Grid';

const Comingsoon = ({startdate}) => {

    return (
        <Grid container direction="column" justify="center" alignItems="center">
			<Grid item>
				<h2>Kezdés</h2>
			</Grid>
			<Grid item>
				<h1>{Math.abs(moment().diff(startdate,'days'))}</h1>
				<p>nap múlva</p>
			</Grid>
		</Grid>
    );
}

export default Comingsoon;