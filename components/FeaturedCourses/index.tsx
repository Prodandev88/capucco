import React from 'react';
import Link from 'next/link'

import {
  Container,
  Wrapper,
  Header,
  Cards,
  Card,
  CardTitle,
  CardDescription,
} from './styled'

interface ICourse {
  title: string,
  description: string,
  location: number,
  subject: number,
  background: string,
}

interface IFeaturedCoursesState {
  data: ICourse[]
}

export default class FeaturedCourses extends React.Component<any, IFeaturedCoursesState> {

  public state = {
    data: [
      {
        title: '10 days express workout with Kim',
        description: 'Blab lasld lasdl asld asl d',
        location: 10,
        subject: 44,
        background: 'https://www.bostonmagazine.com/wp-content/uploads/sites/2/2018/12/at-home-workout.jpg'
      },
      {
        title: 'Pick-up Training Vilnius',
        description: 'Blab lasld lasdl asld asl d',
        location: 10,
        subject: 44,
        background: 'https://alphamantraining.com/wp-content/uploads/2016/08/PUA-training-in-Vilnius-Lithuania-Pick-up-Artist-Daygame-Nightgame-Approach.jpg'
      },
      {
        title: 'The Money Course: Budgeting and Money Education',
        description: 'Blab lasld lasdl asld asl d',
        location: 10,
        subject: 44,
        background: 'https://i.ytimg.com/vi/sfKdw2obrE0/maxresdefault.jpg'
      },
      {
        title: 'Pizza cooking in Roma',
        description: 'Blab lasld lasdl asld asl d',
        location: 10,
        subject: 44,
        background: 'https://www.gustotv.com/wp-content/uploads/2017/06/Eight-stellar-cooking-courses-worth-booking-whole-vacation-around.jpg'
      },
      {
        title: 'Python courses',
        description: 'Blab lasld lasdl asld asl d',
        location: 10,
        subject: 44,
        background: 'https://images.unsplash.com/photo-1513883583436-c8bbfbc3b215?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80'
      },
    ]
  }
  
  render() {

    const { data } = this.state;

    return (
      <Container>
        <Wrapper>
          <Header>Discover the most effective experiences</Header>
          <Cards>
            {data.map((card: ICourse, index: number) =>
              <Link
                key={index}
                href={`/getCourses?location=${card.location}&subject=${card.subject}`}
                as={`/searchresults?location=${card.location}&subject=${card.subject}`}
              >
                <Card
                  backgroundPic={card.background}
                >
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </Card>
              </Link>
            )}
          </Cards>
        </Wrapper>
      </Container>
    )
  }
}