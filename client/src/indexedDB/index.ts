import axios from 'axios';
import Dexie, { DexieOptions, Table } from 'dexie';
import { MovieObject, AddResult, BASE_URL } from './constants';

export default class MovieDB extends Dexie {
  movieTable!: Table<MovieObject>;
  tablePromise: any;
  tableName: string;
  constructor(dbName: string, options?: DexieOptions) {
    super(dbName, options);
    this.tableName = 'movieTable';
    this.version(3).stores({
      [this.tableName]: 'id++, film, &[film+year]',
    });
    this.tablePromise = this.table(this.tableName);
  }

  public initDB = async () => {
    if ((await this.getMovies()).length === 0) {
      const { data } = await axios.get(`${BASE_URL}/movies/get`);
      await this.addMovies(data.map((movie: MovieObject) => ({ ...movie, comments: [] })));
    }
  };

  public getMovie = async (film: string): Promise<MovieObject> => {
    return await this.tablePromise.get({ film });
  };

  public getMovieByID = async (id: number): Promise<MovieObject> => {
    return await this.tablePromise.get({ id });
  };

  public getMovies = async (film?: string): Promise<MovieObject[]> => {
    if (film !== undefined) {
      return await this.tablePromise.where('film').startsWithIgnoreCase(film).toArray();
    }
    return await this.tablePromise.toArray();
  };

  /**
   * Add multiple value to a store.
   * Rejects if an item of a given key already exists in the store.
   **/
  public addMovies = async (data: MovieObject[]): Promise<AddResult> => {
    const clone = [...data];
    const duplicated: MovieObject[] = [];
    const added: MovieObject[] = [];
    for (let i = 0; i < clone.length; i++) {
      const film = await this.getMovie(clone[i].film);
      film ? duplicated.push(film) : added.push(clone[i]);
    }

    await this.tablePromise.bulkAdd(added);
    return { added, duplicated };
  };

  /**
   * Put an item in the database.
   * Replaces any item with the same film name.
   **/
  public updateMovies = async (data: MovieObject[]): Promise<MovieObject[]> => {
    await this.tablePromise.bulkPut(data);
    return data;
  };

  public hasMovies = async (name?: string): Promise<boolean> => {
    const result = await this.getMovies(name);
    return result?.length > 0;
  };
}
