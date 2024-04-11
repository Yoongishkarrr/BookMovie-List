package main

import (
	"os"

	"github.com/yoongishkarrr/go-react-movie-list-yt/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(cors.Default())

	router.POST("/entry/create", routes.AddEntry)
	router.GET("/entries", routes.GetEntries)
	router.GET("/entry/:id", routes.GetEntryById)
	router.GET("/impression/:impression", routes.GetEntriesByImpression)
	router.PUT("/entry/:id", routes.UpdateEntry)
	router.DELETE("/entry/:id", routes.DeleteEntry)
	router.Run(":" + port)
}
