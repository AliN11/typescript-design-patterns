/**
 * Proxy Design Pattern
 * 
 * Proxy pattern acts as an interface or wrapper for an object and allows us to
 * control access to the original object.
 * In this example, we've implemented a downloader class. Since downloading
 * files is considered as a heavy operation, we'd like to cache the downloaded
 * files and return the cached files in subsequent requests.
 * The Proxy pattern allows us to implement this feature without modifying the
 * downloader class.
 * 
 * This content is inspired by:
 * https://refactoring.guru/design-patterns/proxy
 *
 * You can also read a detailed explanation of this pattern here (in Persian):
 * https://ditty.ir/posts/proxy-design-pattern/Jq6W5
 */

/**
 * Subject Interface
 * This interface declares the operations that are common to both real subject (the
 * object that we want to improve it) and the proxy itself. The client works with
 * this interface. So we can pass both real object and the proxied object.
 */
interface DownloaderInterface {
  download(path);
}

/**
 * Real Subject
 * This class does some useful but heavy work. It downloads desired files whenever
 * `download` method is called and if the client wants to download a file multiple
 * times, it's not going to be an optimal solution.
 * 
 */
class FileDownloader implements DownloaderInterface {
  public download(path) {
    console.log(`Downloading ${path}...`);
  }
}

/**
 * The Proxy
 * This class implements to Subject Interface and maintains a reference to the
 * Real Subject so that it can forward requests to it.
 * The proxy object receives requests form the client and does some works before
 * or after forwarding the requests to the Real Subject.
 * In this example, download method first checks whether the desired file is
 * downloaded before. If not, the file will be downloaded via `download` method
 * in the Real Subject and will be cached for subsequent requests.
 */
class FileDownloaderProxy implements DownloaderInterface {
  private downloader: FileDownloader;
  private cachedFiles = {};

  constructor() {
    this.downloader = new FileDownloader;
  }

  public download(path) {
    if (this.cachedFiles.hasOwnProperty(path)) {
      console.log(`Read ${path} from cache`);

      // Returning cached file
      return this.cachedFiles[path];
    } else {
      const result = this.downloader.download(path);

      this.cachedFiles[path] = result;
    }
  }
}

/**
 * The client works with various downloaders via Subject Interface. So both Real
 * Subject and the proxied version can be passed to it.
 */
function client(downloader: DownloaderInterface) {
  downloader.download('http://path-to-file.jpg');
  downloader.download('http://path-to-file.jpg');
  downloader.download('http://path-to-file.jpg');
  downloader.download('http://path-to-file.jpg');
  downloader.download('http://path-to-file.jpg');
}

client(new FileDownloaderProxy());

// logs:
// Downloading http://path-to-file.jpg...
// Read http://path-to-file.jpg from cache
// Read http://path-to-file.jpg from cache
// Read http://path-to-file.jpg from cache
// Read http://path-to-file.jpg from cache
