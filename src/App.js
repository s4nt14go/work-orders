import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Order from './Order';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

export default function App() {

  const [all, setAll] = useState([]);
  const [visible, setVisible] = useState([]);
  const [search, setSearch] = useState('');
  const [latest, setLatest] = useState(false);

  function handleSwitchChange() {
    setLatest(prevState => {
      const newLatest = !prevState;
      setVisible(prevVisble => {
        console.log('prevVisble', JSON.parse(JSON.stringify(prevVisble)));
        const newVisible = prevVisble.sort((a, b) => {
          return latest? a.deadline - b.deadline : b.deadline - a.deadline;
        });
        console.log('newVisible', JSON.parse(JSON.stringify(newVisible)));
        return newVisible;
      });
      return newLatest;
    });
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    console.log('all', all);
    console.log('visible', visible);
    const filtered = all.filter(e => {
      return e.worker.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    console.log('filtered', filtered);
    setVisible(filtered)
  }

  useEffect(() => {

    let uniqueWorkerIds = [], orders;
    axios.get('https://www.hatchways.io/api/assessment/work_orders').then(res => {
      orders = res.data.orders;
      for (let i = 0; i < orders.length; i++) {
        if (!uniqueWorkerIds.includes(orders[i].workerId)) uniqueWorkerIds.push(orders[i].workerId);
        orders[i].deadline = orders[i].deadline*1000;
      }
      const promises = uniqueWorkerIds.map(v => axios.get('https://www.hatchways.io/api/assessment/workers/' + v));
      return Promise.all(promises);
    }).then(res => {
      return res.map(e => e.data.worker);
    }).then(workers => {
      console.log('workers', workers);
      let all = [];
      for (let i = 0; i < workers.length; i++) {
        let filtered = orders.filter(e => {return e.workerId === workers[i].id});
        filtered = filtered.map(e => {return { ...e, worker: workers[i]}});
        all = all.concat(filtered);
      }
      all = all.sort((a, b) => {
        return latest? b.deadline - a.deadline : a.deadline - b.deadline;
      });
      console.log('all', all);
      setAll(all);
      setVisible(all);
    }).catch(e => {
      //console.log('catch error', e);
    });

  // silence missing dependency 'order'
  // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Box my={1} style={{textAlign: 'center'}}>

        <TextField fullWidth variant="outlined"
                   id="name-input"
                   label="Worker name blah"
                   placeholder="Filter by worker name... blah"
                   onChange={handleSearchChange}
                   value={search}
        /><br />

        <Grid style={{margin: 10}}>
          <Typography style={{display: 'inline'}}>Earliest first</Typography>
          <Switch style={{display: 'inline'}}
                  checked={latest}
                  onChange={handleSwitchChange}
                  name="checkedA"
                  color="default" />
          <Typography style={{display: 'inline'}}>Latest first</Typography>
        </Grid>


        {visible.map(order => {
            return <Order key={order.id} {...order} data-testid={order.id} />
        })}


      </Box>
    </Container>
  );
}
