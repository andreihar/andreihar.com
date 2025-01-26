import { Link } from '@/i18n/routing';
import TechIcons from '@/components/widgets/TechIcons';
import StorageImg from '@/components/widgets/StorageImg';
import { ProjectType } from '@/types/blog';

const Project: React.FC<{ meta: ProjectType; }> = ({ meta }) => {
  const { id, title, description, builtW } = meta;

  return (
    <Link href={`/project/${id}` as any} className="block group">
      <div className="bg-white text-white rounded-xl shadow-md overflow-hidden relative min-h-[230px] flex flex-col justify-end">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110" style={{ backgroundImage: `url(${StorageImg({ header: true, id: `${id}/banner`, alt: `Banner of ${title}` })})` }}></div>
        <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 ease-in-out group-hover:opacity-75"></div>
        <div className="absolute top-4 start-4 z-10 text-lg">
          <TechIcons technologies={builtW} />
        </div>
        <div className="relative p-4 flex flex-col justify-end h-full">
          <div className="transition-all duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0 mb-3 group-hover:mb-0">
            <h1 className="block text-lg font-semibold leading-tight pb-2">
              {title}
            </h1>
            <p className="text-lg opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Project;