import React from 'react';
import axios from 'axios';

import {
  Container,
  Field,
  Dropdown,
  Place,
} from './styled';
import {
  ILocation,
} from '../types';

interface ILocationProps {
  locationValue: ILocation,
  onLocationChange: (location: ILocation) => void,
  placeholder: string,
}

interface ILocationState {
  inputValue: string,
  isTyping: any,
  isDropDownVisible: boolean,
  data: ILocation[],
  isDataLoading: boolean,
}

export default class Location extends React.Component<ILocationProps, ILocationState> {

  public state = {
    inputValue: '',
    isTyping: null,
    isDropDownVisible: false,
    isDataLoading: true,
    data: []
  }

  public handleInputChange = (value: string) => {

    const {
      onLocationChange
    } = this.props;

    onLocationChange({
      id: 0,
      name: ''
    });

    this.setState({
      inputValue: value,
      isDropDownVisible: true,
    })
  }

  public getLocationsByQuery = async(query: string) => {

    let locationsData: any[] = [];

    axios.get('/api/locations')
      .then((response) => {

        locationsData = response.data || [];
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        this.setState({
          data: query ? locationsData : []
        })
      })
  }

  public handleInputKeyUp = (e: any) => {

    const {
      isTyping
    } = this.state;

    const value = e.target.value;

    if (isTyping) {
      clearTimeout(isTyping);
    }

    this.setState({
      isTyping: setTimeout(() => {
        this.getLocationsByQuery(value)
      }, 500)
   });
    
  }

  public handleLocationChange = (location: ILocation) => {

    const {
      onLocationChange
    } = this.props;

    onLocationChange(location);

    this.setState({
      isDropDownVisible: false,
    })
  }

  static getDerivedStateFromProps = (nextProps: ILocationProps, prevState: ILocationState) => {

    return {
      inputValue: nextProps.locationValue.id === 0
        ? prevState.inputValue 
        : nextProps.locationValue.name
    };
  }

  render() {

    const { 
      isDropDownVisible,
      data,
      inputValue,
    } = this.state;

    const {
      placeholder
    } = this.props;
  
    return (
      <Container>
        <Field
          placeholder={placeholder}
          onChange={(e: any) => this.handleInputChange(e.target.value)}
          onKeyUp={(e: any) => this.handleInputKeyUp(e)}
          value={inputValue}
        />
        {isDropDownVisible &&
          <Dropdown>
            {data.map((place: ILocation, index: number) => 
              <Place 
                key={index}
                onClick={() => this.handleLocationChange(place)}
              >
                {place.name}
              </Place>
            )}
          </Dropdown>
        }
      </Container>
    )
  }
}