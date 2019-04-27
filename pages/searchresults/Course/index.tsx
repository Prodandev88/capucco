import React from 'react';
import Link from 'next/link';

import {
  Container,
  Image,
  Info,
  InfoFields,
  Title,
  Description,
  Options,
  Option,
  Actions,
  Price,
  Book,
} from './styled';

interface ICourseProps {
  data: any
}

export default class Course extends React.Component<ICourseProps> {

  render() {

    const {
      id,
      image,
      title,
      description,
      price,
      options
    } = this.props.data;

    return (
      <Container>
        <Info>
          <Image src={image} />
          <InfoFields>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Options>
              {options && options.length > 0 && options.map((option: string, index: number) =>
                <Option key={index}>{option}</Option>
              )}
            </Options>
          </InfoFields>
        </Info>
        <Actions>
          <Price>$ {price}</Price>
          <Link
            href={`/course?id=${id}`}
          >
            <Book>Book</Book>
          </Link>
        </Actions>
      </Container>
    )
  }
}
