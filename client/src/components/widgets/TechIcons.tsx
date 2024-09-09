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

const TechIcons: React.FC<{ technologies: string[]; showTooltip?: boolean; className?: string; }> = ({ technologies, showTooltip, className }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ''}`}>
      {technologies.map((tech) => {
        const IconComponent = iconMapping[tech];
        return (
          <div key={tech} className="relative group">
            <IconComponent />
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 mb-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out items-center whitespace-nowrap rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white dark:from-gray-700 dark:to-gray-600 z-20">
                {tech}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TechIcons;