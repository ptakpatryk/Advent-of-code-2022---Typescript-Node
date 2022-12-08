import { getFileInterface } from '../../utils';

const FILE_PATH = 'public/day_7_input.txt';
const TOTAL_DISK_SPACE = 70000000;
const NEEDED_UNUSED_SPACE = 30000000;

type ILineType = 'command' | 'file' | 'directory';

type IFile = {
  path: string;
  type: 'file';
  size: number;
}

type IDirectory = {
  path: string;
  type: 'directory';
}

type ISystemStructure = IFile | IDirectory;

type IState = {
  currentDirectoryPath: string;
  systemStructure: ISystemStructure[];
}

export const partOne = () => {
  const file = getFileInterface(FILE_PATH);

  let state: IState = {
    currentDirectoryPath: '',
    systemStructure: [],
  };

  return new Promise((resolve) => {
    file.on('line', line => {
      state = handleLine(line, state);
    });

    file.on('close', () => {
      let dirs = getDirectorySizes(state.systemStructure);
      dirs = dirs.filter(dir => dir.size < 100000);
      const result = dirs.reduce((acc, curr) => acc + curr.size, 0);

      resolve(result);
    });
  });
};

export const partTwo = () => {
  const file = getFileInterface(FILE_PATH);

  let state: IState = {
    currentDirectoryPath: '',
    systemStructure: [],
  };

  return new Promise((resolve) => {
    file.on('line', line => {
      state = handleLine(line, state);
    });

    file.on('close', () => {
      const totalSize = getTotalSize(state.systemStructure);
      const unusedSpace = TOTAL_DISK_SPACE - totalSize;
      let result = getDirectorySizes(state.systemStructure);
      result = result.filter(dir => dir.size + unusedSpace >= NEEDED_UNUSED_SPACE)
        .sort((a, b) => a.size - b.size);

      resolve(result[0].size);
    });
  });
};


function handleLine(line: string, currentState: IState): IState {
  let state = { ...currentState };
  const lineType = getLineType(line);

  if (lineType === 'command') {
    state = exectudeCommand(line, state);
  } else if (lineType === 'directory') {
    state = createDirectory(line, state);
  } else if (lineType === 'file') {
    state = createFile(line, state);
  }

  return state;

}

function getLineType(line: string): ILineType {
  if (line.startsWith('$')) {
    return 'command';
  } else if (line.startsWith('dir')) {
    return 'directory';
  }

  return 'file';
}


function exectudeCommand(commandLine: string, currentState: IState): IState {
  const command = commandLine.slice(2);

  if (command.startsWith('cd')) {
    return changeDirectory(command.slice(3), currentState);
  }

  return currentState;
}

function createDirectory(commandLine: string, currentState: IState): IState {
  const name = commandLine.slice(4);

  const newDirectory: ISystemStructure = {
    path: currentState.currentDirectoryPath + `${name}/`,
    type: 'directory',
  };

  return {
    ...currentState,
    systemStructure: [...currentState.systemStructure, newDirectory]
  };
}

function createFile(commandLine: string, currentState: IState): IState {
  const [size, name] = commandLine.split(' ');

  const newFile: ISystemStructure = {
    path: currentState.currentDirectoryPath + `${name}`,
    type: 'file',
    size: parseInt(size)
  };

  return {
    ...currentState,
    systemStructure: [...currentState.systemStructure, newFile]
  };
}

function changeDirectory(directoryName: string, currentState: IState): IState {
  // reverse directory
  if (directoryName === '..') {
    const previousPath = currentState.currentDirectoryPath.split('/');
    if (previousPath.at(-1) === '') {
      previousPath.pop();
    }
    previousPath.pop();

    return {
      ...currentState,
      currentDirectoryPath: previousPath.join('/') + '/'
    };
  } else if (directoryName === '/') {
    return {
      ...currentState,
      currentDirectoryPath: ''
    };
  } else {
    // creates directory file

    return {
      ...currentState,
      currentDirectoryPath: currentState.currentDirectoryPath + `${directoryName}/`
    };
  }
}

function getDirectorySizes(structure: ISystemStructure[]) {
  const dirs = structure.filter(el => el.type === 'directory');


  const sizes = dirs.map(dir => {
    const filesIncluded = structure
      .filter(el => el.type === 'file')
      .filter(file => {
        return file.path.includes(dir.path);
      }) as IFile[];

    return {
      dirPath: dir.path,
      size: filesIncluded.reduce((acc, curr) => acc + curr.size, 0),
    };
  });

  return sizes;
}

function getTotalSize(structure: ISystemStructure[]) {
  const files = structure.filter(el => el.type === 'file') as IFile[];

  return files.reduce((acc, curr) => acc + curr.size, 0);
}
