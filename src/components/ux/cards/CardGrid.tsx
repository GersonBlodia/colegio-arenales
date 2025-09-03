import { ChevronRight, LucideProps } from "lucide-react";

interface PropsGrid {
  userRole: string | undefined;
  handleCardClick: (item: any) => void;
  filteredMenuItems: (
    | {
        id: string;
        title: string;
        icon: React.ForwardRefExoticComponent<
          Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
        >;
        href: string;
        roles: string[];
        description: string;
        color: string;
        children?: undefined;
      }
    | {
        id: string;
        title: string;
        icon: React.ForwardRefExoticComponent<
          Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
        >;
        roles: string[];
        description: string;
        color: string;
        children: {
          id: string;
          title: string;
          href: string;
          roles: string[];
        }[];
        href?: undefined;
      }
  )[];
}
export const CardGrid = ({
  handleCardClick,
  filteredMenuItems,
  userRole,
}: PropsGrid) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredMenuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.id}
            onClick={() => handleCardClick(item.id)}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />

            {/* Card Content */}
            <div className="relative p-6">
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} mb-4 shadow-lg`}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Children Count */}
              {item.children && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {
                      item.children.filter((child) =>
                        child.roles.includes(userRole)
                      ).length
                    }{" "}
                    opciones
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-200" />
                </div>
              )}

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
