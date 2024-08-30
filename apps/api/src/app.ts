import express from 'express';
import { PORT } from './config';
import { SampleRouter } from './routers/sample.router';

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.use('/auth', SampleRouter);
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

export default App;