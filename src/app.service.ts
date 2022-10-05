import { Injectable } from '@nestjs/common';


export interface IMovie {
  id: number;
  name: string;
  year: number;
}

@Injectable()
export class AppService {
  private movies: IMovie[] = [
    { id: 1, name: 'Fuck Wars: The Force Awakens', year: 2015 },
    { id: 2, name: 'Star Wars: The Last Jedi2', year: 2017 },
    { id: 3, name: 'Star Wars: The Rise of Skywalker2', year: 2019 },
  ];
  getMovies(): IMovie[] {
    return this.movies;
  }

  getMessage():string{
    return 'Message 2';
  }
}
