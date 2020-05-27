import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Collapse from '@material-ui/core/Collapse';

export default function LocationTree({ locations, setLocations }) {
  const [checked, setChecked] = React.useState([0]);
  console.log("locations", locations);

  const showList = items => {
    return (<List component="div" disablePadding>
      {locations.filter(item => !item.locationId).map( (value, index) => {
        const labelId = `checkbox-list-label-${index}`;
        return (<ListItem button className={""}>
          <ListItemIcon>
            <Checkbox
              onChange={(e) => handleChange(e, value.id)}
              edge="start"
              checked={
                checked[value.id]
              }
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
        <ListItemText primary="Starred" />
      </ListItem>)
      })}
    </List>)
  }

  const findChildren = parent => {
    const children = locations.filter(item => parent.id == item.locationId)
    const index = 0;
    const labelId = `checkbox-list-label-${index}`;
    const open = true;
    console.log(children);
    
    if(children){
      return <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" dense disablePadding style={{ marginLeft: 20 }}>
          {children.map((value, index) => (<React.Fragment><ListItem button className={"nested"} >
            <ListItemIcon>
              <Checkbox
                onChange={(e) => handleChange(e, value.id)}
                edge="start"
                checked = {
                  checked[value.id] ? checked[value.id] : false
                }
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText primary={value ? value.name : ''} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <KeyboardArrowRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {findChildren(value)}
          </React.Fragment>))}
        </List>
      </Collapse>
    }
    return null
  }
  
  const handleChange = (event,id) => {
    let data = { ...checked}
    data[id] = event.target.checked
    setChecked(data);
    setLocations(data)
  };

  const handleToggle = value => () => {
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }

    // setChecked(newChecked);
  };

  return (
    <List className={"rootX"}>
      {locations.filter( item => !item.locationId ).map((value,index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (<React.Fragment key={index}> 
              <ListItem  role={undefined} dense button onClick={handleToggle(value.id)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    onChange={(e) => handleChange(e,value.id)}
                    checked = {
                      checked[value.id] ? checked[value.id] : false
                    }
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value ? value.name : ''} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <KeyboardArrowRightIcon / >
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {findChildren(value)}
          </React.Fragment>
        );
      })}
    </List>
  );
}
