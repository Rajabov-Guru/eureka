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
    { id: 2, name: 'Star Wars: The Last Jedi', year: 2017 },
    { id: 3, name: 'Star Wars: The Rise of Skywalker', year: 2019 },
  ];
  getMovies(): IMovie[] {
    return this.movies;
  }

  getMessage():string{
    return process.env.MYSQL_DATABASE;
  }
}
