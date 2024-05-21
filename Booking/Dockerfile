# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
WORKDIR /src
COPY Booking.sln ./
COPY Booking/*.csproj ./Booking/
COPY Model/*.csproj ./Model/
RUN dotnet restore

# copy everything else and build app
COPY . .

WORKDIR /src/Model
RUN dotnet publish -o /app

WORKDIR /src/Booking
RUN dotnet publish -o /app

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "Booking.dll"]