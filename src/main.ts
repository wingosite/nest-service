import * as dotenv from 'dotenv';
import AdminBootstrap from './admin/admin.bootstrap';
import AppBootstrap from './app/app.bootstrap';

dotenv.config();
AdminBootstrap();
AppBootstrap();
