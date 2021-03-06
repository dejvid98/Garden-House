import {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import ProgressBar from './ProgressBar';
import Fertilizer from './Fertilizer';
import axios from 'axios';
const styles = require('./SeedlingContainer.module.scss');

const SeedlingContainer = props => {
  const [percentage, setPercentage] = useState(50);

  const isReady = new Date(props.harvestdate).getTime() >= new Date().getTime();

  const calculateProgress = date => {
    const totalHours = 480;

    const hoursPassed = Math.floor(
      (new Date(date).getTime() - new Date().getTime()) / 1000 / 3600,
    );

    const hoursLeft = totalHours - hoursPassed;

    const percentageDone = Math.floor((hoursLeft / totalHours) * 100);

    if (percentageDone < 0 || percentageDone > 100) return setPercentage(100);

    setPercentage(percentageDone);
  };

  const harvestSeedling = async () => {
    await axios.post('https://gardenhouse.tech/seedling/harvest', {
      id: props.id,
      nurseryid: props.nurseryid,
    });
    props.getseedlings();
  };

  useEffect(() => {
    calculateProgress(props.harvestdate);
  }, []);
  return (
    <div className={styles.container}>
      <p>{props.name}</p>
      <p>
        {isReady
          ? `Ready ${moment(props.harvestdate).endOf('hour').fromNow()}` // in a day
          : 'Ready'}
      </p>

      <ProgressBar completed={percentage} />

      {isReady ? (
        <Fertilizer
          id={props.id}
          showalert={props.fertilizerAlert}
          getnurserydata={props.getnurserydata}
        />
      ) : props.transplant_date ? (
        <Button
          variant="contained"
          color="primary"
          disabled={true}
          className={styles.harvestButton}
        >
          Harvesting...
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={styles.harvestButton}
          onClick={harvestSeedling}
        >
          Harvest
        </Button>
      )}
    </div>
  );
};

export default SeedlingContainer;
