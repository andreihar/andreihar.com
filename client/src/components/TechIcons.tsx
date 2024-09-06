import { IconType } from 'react-icons';
import { SiAndroid, SiAngular, SiAuth0, SiBootstrap, SiSquare, SiProbot, SiExpress, SiFirebase, SiFlask, SiI18Next, SiKeras, SiZalando, SiMui, SiNextdotjs, SiNumpy, SiPostgresql, SiPytorch, SiPython, SiReact } from 'react-icons/si';

const iconMapping: { [key: string]: IconType; } = {
  android: SiAndroid,
  angular: SiAngular,
  auth0: SiAuth0,
  bootstrap: SiBootstrap,
  customtkinter: SiSquare,
  detectron2: SiProbot,
  express: SiExpress,
  firebase: SiFirebase,
  flask: SiFlask,
  i18next: SiI18Next,
  keras: SiKeras,
  matlab: SiZalando,
  mui: SiMui,
  nextjs: SiNextdotjs,
  numpy: SiNumpy,
  postgresql: SiPostgresql,
  pytorch: SiPytorch,
  python: SiPython,
  react: SiReact,
};

const TechIcons: React.FC<{ technologies: string[]; className?: string; }> = ({ technologies, className }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ''}`}>
      {technologies.map((tech) => {
        const IconComponent = iconMapping[tech];
        return (
          <div key={tech} className="relative group">
            <IconComponent />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black dark:bg-white text-white dark:text-black text-sm rounded py-1 px-2">
              {tech}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TechIcons;