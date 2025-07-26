import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Users, Trophy } from 'lucide-react';
import { NFL_TEAMS } from '@shared/teams';
import { useState } from 'react';

export default function NFLPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTeams = NFL_TEAMS.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedTeams = {
    'AFC East': filteredTeams.filter(team => team.conference === 'AFC' && team.division === 'East'),
    'AFC North': filteredTeams.filter(team => team.conference === 'AFC' && team.division === 'North'),
    'AFC South': filteredTeams.filter(team => team.conference === 'AFC' && team.division === 'South'),
    'AFC West': filteredTeams.filter(team => team.conference === 'AFC' && team.division === 'West'),
    'NFC East': filteredTeams.filter(team => team.conference === 'NFC' && team.division === 'East'),
    'NFC North': filteredTeams.filter(team => team.conference === 'NFC' && team.division === 'North'),
    'NFC South': filteredTeams.filter(team => team.conference === 'NFC' && team.division === 'South'),
    'NFC West': filteredTeams.filter(team => team.conference === 'NFC' && team.division === 'West'),
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-team-red to-fan-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🏈 Official NFL Merchandise
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              NFL Team Gear
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Shop official NFL merchandise for all 32 teams. From jerseys to hats, find everything you need to support your favorite team.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">32</div>
                <div className="text-sm text-blue-200">Teams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-blue-200">Divisions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-blue-200">Products</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Grid by Division */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {Object.entries(groupedTeams).map(([division, teams]) => {
            if (teams.length === 0) return null;
            
            return (
              <div key={division} className="mb-16">
                <div className="flex items-center space-x-3 mb-8">
                  <Trophy className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">{division}</h2>
                  <Badge variant="secondary">{teams.length} teams</Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teams.map((team) => (
                    <Link key={team.id} to={`/nfl/${team.slug}`}>
                      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <CardHeader 
                          className="text-center text-white relative"
                          style={{
                            background: `linear-gradient(135deg, ${team.colors.primary} 0%, ${team.colors.secondary} 100%)`
                          }}
                        >
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                          <div className="relative">
                            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                              <Users className="h-8 w-8" />
                            </div>
                            <CardTitle className="text-xl font-bold">
                              {team.city}
                            </CardTitle>
                            <div className="text-lg font-semibold text-white/90">
                              {team.name}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 text-center">
                          <div className="flex items-center justify-center space-x-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              {team.conference}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {team.division}
                            </Badge>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          >
                            Shop Team Gear
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-fan-blue-600 to-team-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Can't Find Your Team?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're constantly adding new products and teams. Check back soon or contact us for special requests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              Browse All Products
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
